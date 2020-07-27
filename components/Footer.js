import LocaleSwitcher from './LocaleSwitcher';

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
    <style jsx>
      {`
        .footer {
          position: fixed;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          //background-color: rgb(36, 36, 36);
          background-color: #008489;
          height: 70px;
          width: 100%;
          bottom: 0px;
          // opacity: 0.7;
        }
        li {
          list-style: none;
        }
        .socialMediaLinks {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .socialMediaIcons {
          height: 25px;
          width: 25px;
          filter: invert(1);
        }
        .footerOptions {
          margin: 10px;
          border-radius: 15px;
          background-color: rgba(0, 128, 128, 0.185);
          color: white;
        }
      `}
    </style>
  </footer>
);

export default Footer;
