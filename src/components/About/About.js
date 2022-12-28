import './About.css'
import picture from '../../images/me.jpeg'

function About() {
  return (
    <section className="about">
      <img src={picture} alt="Author" className="about__picture" />
      <div className="about_description">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, everybody! My name is Meir Nigberg. I am a full stack web
          developer, and this is my final project at Practicum-100 course.
        </p>
        <p className="about__text">
          You can create your account and log in. Here you can find the latest
          news around the world by entering keywords in the search form. You can
          also save your favorite news in your account, and return to your
          favorite articles by clicking "Saved articles" link on the top of the
          page.
        </p>
        <p className="about__text">
          Frontend part of this project is built using ReactJS. Backend part is
          built using NodeJS, ExpressJS and MongoDB
        </p>
      </div>
    </section>
  )
}
export default About
