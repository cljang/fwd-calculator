function Header({title}) {


  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
  
}

Header.defaultProps = {
  year: "My React App"
}

export default Header;
