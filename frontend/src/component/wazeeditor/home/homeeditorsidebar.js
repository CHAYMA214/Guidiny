import { useState } from 'react';
import {
  FaExclamationTriangle,
  FaGlobe,
  FaTimes
} from 'react-icons/fa';
import '../../../css/editor.css';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center p-2 rounded-md cursor-pointer transition-all duration-150 btn btn-outline-secondary w-100 mt-2"
  >
    <span style={{ minWidth: '36px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </span>
    <span style={{ marginLeft: '12px' }} className="font-semibold">
      {label}
    </span>
  </div>
);

const MapEditorSidebar = ({ onReportClick }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const goToEditor = (link) => {
    navigate(link);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        width: '300px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        borderTopRightRadius: '15px',
        borderBottomRightRadius: '15px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      }}
      className="p-4 flex flex-col"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 600 }}>Guidiny</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setIsOpen(false)}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FaTimes size={20} />
        </button>
      </div>

      <SidebarItem
        icon={<FaExclamationTriangle size={24} color="#EF4444" />}
        label="Dangers"
        onClick={() => goToEditor('/dangers')}
      />
      <hr className="my-2" />
      <SidebarItem
        icon={<FaGlobe size={24} color="#3B82F6" />}
        label="Lieux"
        onClick={() => goToEditor('/lieux')}
      />
      <hr className="my-2" />

      <button
        className="btn btn-info w-100 mt-auto"
        onClick={() => goToEditor('/dashboard')}
      >
        Retour
      </button>
    </div>
  );
};

export default MapEditorSidebar;
