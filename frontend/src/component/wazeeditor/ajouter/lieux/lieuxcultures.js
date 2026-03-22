import { useNavigate } from 'react-router-dom';
import { FaFilm, FaTheaterMasks } from 'react-icons/fa';

const lieuxculturesData = [
  { label: 'Cinéma',  icon: <FaFilm size={24} color="#E11D48" /> },
  { label: 'Théâtre', icon: <FaTheaterMasks size={24} color="#8B5CF6" /> },
];

const LieuxculturesMenuPage = () => {
  const navigate = useNavigate();

  const goToEditor = (label) => {
    navigate(`/editor?label=${encodeURIComponent(label)}`);
  };

  return (
    <div className="card p-4" style={{
      width: '300px',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: 'white',
      borderTopRightRadius: '15px',
      borderBottomRightRadius: '15px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h5 className="text-lg font-bold mb-4 whitespace-nowrap">Culture et divertissement :</h5>

      {lieuxculturesData.map((category) => (
        <div
          key={category.label}
          onClick={() => goToEditor(category.label)}
          className="flex items-center p-2 rounded-md cursor-pointer transition-all duration-150 btn btn-outline-secondary w-100 mt-2"
        >
          <span style={{ minWidth: '36px', display: 'flex', justifyContent: 'center' }}>
            {category.icon}
          </span>
          <span style={{ marginLeft: '12px' }} className="font-semibold">
            {category.label}
          </span>
        </div>
      ))}

      <button
        onClick={() => navigate('/lieux')}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded w-100"
      >
        Retour
      </button>
    </div>
  );
};

export default LieuxculturesMenuPage;
