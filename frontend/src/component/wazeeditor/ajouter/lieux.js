import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaCar, FaStore, FaUtensils, FaTheaterMasks } from 'react-icons/fa';

const MapEditorPage = () => {
  const { id } = useParams();
  return <div>Éditeur de carte de l'utilisateur {id}</div>;
};

const lieuxMenuData = [
  { label: 'Entretien automobile', link: '/lieuxentretien', icon: <FaCar size={24} color="#3B82F6" /> },
  { label: 'Commerces et services', link: '/services', icon: <FaStore size={24} color="#10B981" /> },
  { label: 'Restauration', link: '/restauration', icon: <FaUtensils size={24} color="#F59E0B" /> },
  { label: 'Culture et divertissement', link: '/culture-divertissement', icon: <FaTheaterMasks size={24} color="#8B5CF6" /> }
];


const LieuxMenuPage = ({ onBack }) => {
  const navigate = useNavigate();
  const goToEditor = (link) => {
    navigate(link);
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
      <h4 className="text-xl items-center font-bold mb-4 whitespace-nowrap">Catégories de lieux :</h4>
      {lieuxMenuData.map((category) => (
     <div
  key={category.label}
  onClick={() => goToEditor(category.link)}
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
        onClick={() => navigate('/editor')}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        Retour
      </button>
    </div>
  );
};

export default LieuxMenuPage;
