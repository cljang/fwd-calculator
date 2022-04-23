function Footer({year, author}) {


  return (
    <footer>
      <p>© {year} {author ? author : ""}</p>
    </footer>
  );
  
}

Footer.defaultProps = {
  year: new Date().getFullYear()
}

export default Footer;
