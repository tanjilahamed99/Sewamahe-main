import logo from '../../../assets/logo.png';

function Logo() {
  return (
    <div className="w-full flex items-center justify-center">
      <img src={logo} alt="Logo" className='max-w-40 w-full'/>
    </div>
  );
}

export default Logo;
