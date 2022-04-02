import React from 'react'
import { Switch } from 'react-router-dom'

import { Route } from './route'
import { SignIn } from '../pages/signIn'
import { SignUp } from '../pages/signUp'
import { Dashboard } from '../pages/dashboard'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn}/>
    <Route path="/signup" component={SignUp}/>

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)
