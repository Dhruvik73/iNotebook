import React from 'react';
export default function About() {
    return (
    <>
    <div className="accordion my-5 " id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       iNotebook
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>What is iNotebook?</strong>--inotebook is online servise which is provide you to store your daily notes in iNotebook. this all your notes is safe and no one can see your notes except you. 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
       Tutorial
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <strong>step-1</strong>--:First if you are new sign up in our site and use it.you creat your own note which secure by us.<br/>
      <strong>step-2</strong>--:if you are already user of this site then login and use it.<br/>
      <strong>step-3</strong>--:you also delete your note and edit it any time you need.
      </div>
    </div>
  </div>
</div></>
  )
}
