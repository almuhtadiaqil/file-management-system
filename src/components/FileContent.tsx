import React from 'react';
import { Directory } from '../interfaces/Directory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

interface FileContentProps {
  directories: Directory[]
  loading: boolean
  onDirectoryClick: (folder: Directory) => void;
  handleCreate: () => void
  isCreate: boolean
}
const FileContent: React.FC<FileContentProps> = ({ handleCreate, isCreate, directories, loading, onDirectoryClick}) => {
  return (
    <div className="flex-1 p-4 bg-white shadow-inner">
      <h2 className="font-bold text-lg mb-4">
        Files
        {isCreate&&(
        <button onClick={handleCreate} className="bg-blue-500 text-black px-2 py-1 rounded hover:bg-blue-600">
          +
        </button>
        )}
        </h2>
        {
          loading? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 mx-auto"></div>
          ):(
            <div className="grid grid-cols-4 gap-4">
              {directories.map((directory)=>(
                  directory.is_directory ? (
                    <div key={directory.id} 
                    onClick={()=>onDirectoryClick(directory)}
                    className='p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 flex items-center text-sm '
                    >
                      <FontAwesomeIcon className={"fa-regular mr-1"} icon={faFolder} />
                      {directory.name}
                    </div>
                  ) :(
                    <div key={directory.id} 
                    className='p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 flex items-center text-sm '
                    >
                      <FontAwesomeIcon className={"fa-regular mr-1"} icon={faFile} />
                      {directory.name}
                    </div>
                  )
                
              ))}
            </div>
          )
        }
    </div>
  );
};

export default FileContent;
