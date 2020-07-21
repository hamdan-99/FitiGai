import LocaleSwitcher from './LocaleSwitcher'

let socialMedia = ['twitter', 'facebook', 'instagram', 'linkedin'];

const Footer = () => (
  <footer className='footer'>
    <div className='languageSelection'>
      <LocaleSwitcher />
    </div>
    <div className='socialMediaLinks'>
      {socialMedia.map((item, key) => (
        <a key={key} href='#' className='socialMediaLink'>
          <img
            className='socialMediaIcons footerOptions'
            alt={`${item} Link`}
            src={`/images/${item}.svg`}
          />
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
