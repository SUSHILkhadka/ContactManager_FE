import { Button } from 'antd';
import './About.css';
export const AboutPage = () => {
  return (
    <div className='page-about'>
      <div className='content-box'>
        <h1> Keep Personal Contact</h1>
        <div className='content-message'>
          <div className='first-line'>
            {' '}
            Keep your contact in cloud and get access from anywhere
          </div>
          <div className='second-line'> Add, Edit, List your contacts</div>
          <div className='third-line'> and much more</div>
        </div>
      </div>
      <a href='https://contacts.google.com/' target='_blank'>
        <Button id='AddContact' type='primary'>
          Learn More
        </Button>
      </a>
    </div>
  );
};
