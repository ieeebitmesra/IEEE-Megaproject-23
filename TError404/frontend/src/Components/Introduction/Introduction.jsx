import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = () => {
  return (
    <>
    {/* <div><Link to={'/signin'}>Signin</Link></div>
    <div><Link to={'/signup'}>Signup</Link></div> */}
    <div className='container'>
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="images/images5.jpeg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <Link to={'/signup'}><button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Signup</button></Link>
        <Link to={'/signin'}><button type="button" className="btn btn-outline-secondary btn-lg px-4">Signin</button></Link>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Introduction