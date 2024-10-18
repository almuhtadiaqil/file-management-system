import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import FileContent from './components/FileContent';
import { Directory } from './interfaces/Directory';
import axios from 'axios';

const App: React.FC = () => {
  const [directories, setDirectories] = useState<Directory[]>([])
  const [subDirectories, setSubDirectories] = useState<Directory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);

  const fetchDirectories = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/folders",{
       baseURL: "http://localhost:5000",
       params: {
        name: selectedDirectory?selectedDirectory.name : "",
        path: selectedDirectory?selectedDirectory.path: "public"
       }
      })
      if (response.status === 200) {
       setDirectories(response.data.data.directories)
       setSubDirectories(response.data.data.sub_directories)
       setLoading(false)
      }    
    } catch (error) {
      console.log(`Error fetching folders: `,error)
      setLoading(false)
    }
  }

  const createDirectory = async(createDirectoryName: string) =>{
    try {
      const response = await axios.post('/folders',
        {
          name: createDirectoryName,
          parentPath: selectedDirectory?`${selectedDirectory.path}/${selectedDirectory.name}`: "public",
          parent_name: selectedDirectory?.name
        },
        {
          baseURL: "http://localhost:5000"
        }
      )

      if (response.status === 201) {
        fetchDirectories();
      }
    } catch (error) {
      alert(`Error creating directory: ${error}`);
    }
  }

  const handleAddDirectory = () => {
    const directoryName = prompt('Enter new directory name:');
    if (directoryName) {
      createDirectory(directoryName);
    }
  };

  const handleDirectoryClick = (directory: Directory) => {
    setSelectedDirectory(directory); // Set the selected directory
    setIsCreate(!directory.path.includes("static") && directory.name !== "static")
    setDirectories([])
    setSubDirectories([])
    fetchDirectories(); // Fetch child folders with the selected directory's id
  };

  useEffect(()=>{
    fetchDirectories()
  },[selectedDirectory])
  return (
    <div className="flex h-screen">
      <Sidebar handleCreate={handleAddDirectory} isCreate={isCreate} directories={directories} loading={loading} onDirectoryClick={handleDirectoryClick} selectedDirectoryId={selectedDirectory?.id ?? null}/>
      <FileContent handleCreate={handleAddDirectory} isCreate={isCreate} directories={subDirectories} loading={loading} onDirectoryClick={handleDirectoryClick}/>
    </div>
  );
};


export default App;
