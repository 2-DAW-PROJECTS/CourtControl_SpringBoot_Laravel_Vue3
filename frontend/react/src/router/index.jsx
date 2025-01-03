import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../views/HomePage';
import ProfilePage from '../views/ProfilePage';
import ShopPage from '../views/ShopPage';
import CourtDetails from '../components/details/CourtDetails';
import LessonDetails from '../components/details/LessonDetails';
import DashboardsPage from '../pages/DashboardsPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/court/:id" component={CourtDetails} />
            <Route path="/lesson/:id" component={LessonDetails} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/admin/:type" component={DashboardsPage} />
        </Switch>
    </Router>
);

export default Routes;

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import HomePage from '../views/HomePage';
// import ProfilePage from '../views/ProfilePage';
// import ShopPage from '../views/ShopPage';
// import CourtDetails from '../components/details/CourtDetails';
// import LessonDetails from '../components/details/LessonDetails';

// const Routes = () => (
//     <Router>
//         <Switch>
//             <Route path="/" exact component={HomePage} />
//             <Route path="/shop" component={ShopPage} />
//             <Route path="/court/:id" component={CourtDetails} />
//             <Route path="/lesson/:id" component={LessonDetails} />
//             <Route path="/profile" component={ProfilePage} />
//         </Switch>
//     </Router>
// );

// export default Routes;