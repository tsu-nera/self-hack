import { Route, Switch } from 'react-router-dom';

import * as React from 'react';
import Challenge from './Challenge';
import Challenges from './Challenges';
import DashBoard from './DashBoard';
import Layout from '../templates/DefaultLayout';
import Categories from './Categories';
import Category from './Category';
import Ranking from './Ranking';

import DemoBoard from '../molecules/DemoBoard';

const Home = () => (
  <Layout>
    <DemoBoard />
    <Switch>
      <Route path="/challenges/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/categories/:id" component={Category} />
      <Route path="/categories" component={Categories} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
