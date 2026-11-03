import logoImg from '../assets/FlyNow-logo-branca.png';

export default function Header() {
  return (
    <header className="header">
      <img src={logoImg} alt="FlyNow logo" className="header-logo" />
    </header>
  );
}
