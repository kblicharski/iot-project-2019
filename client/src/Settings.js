import React from 'react';
import TemperatureForm from './TemperatureForm';

/*
A page where the user can choose all the settings for the auto-terrarium system.

Help with forms:
https://blog.logrocket.com/an-imperative-guide-to-forms-in-react-927d9670170a
https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs
https://github.com/learnetto/react-form-validation-demo
*/

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <TemperatureForm />
    </div>
  )
}

export default Settings;