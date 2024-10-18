import React from 'react'
import { Directory } from '../interfaces/Directory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  directories: Directory[]
  loading: boolean
  onDirectoryClick: (folder: Directory) => void;
  handleCreate: () => void
  selectedDirectoryId: string | null;
  isCreate: boolean
}
const Sidebar: React.FC<SidebarProps> = ({ handleCreate, isCreate,directories, loading, onDirectoryClick, selectedDirectoryId }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 shadow-lg">
      <h2 className="font-bold text-lg mb-4 flex justify-between items-center">
        Folders
        {/* {isCreate&&(
        <button onClick={handleCreate} className="bg-blue-500 text-black px-2 py-1 rounded hover:bg-blue-600">
          +
        </button>
        )} */}
      </h2>
      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 mx-auto"></div>
      ) :
        (
          <ul className="space-y-1">
            {directories.map((directory) => (
              <li key={directory.id}
              onClick={()=>onDirectoryClick(directory)}
              className={`p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 flex items-center text-sm 
                ${selectedDirectoryId === directory.id ? 'bg-blue-300' : 'bg-gray-200'}`}>
                  <FontAwesomeIcon className={"fa-regular mr-1"} icon={faFolder} />
                {directory.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default Sidebar;