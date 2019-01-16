import React from 'react';
import {
    BrowserRouter, Route, Switch,
    // Link, NavLink
} from 'react-router-dom';
import App from './App'
import NotFoundPage from './common/NotFound';
import Header from './common/Header';
// import Layout from './components/common/Layout';
import FileQCReportContainer from './file/FileQCReportContainer';
import FileMain from './file/FileMain';
import Experiment from './experiment-set-replicates/Experiment';
// import Footer from './components/common/Footer';
import Set from './set';
import ExperimentReplicates from './experiment-set-replicates';
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            {/* <Layout> */}
                <Switch>
                    <Route path="/" component={App} exact={true}/>
                    <Route path="/set" component={Set} exact={true}/>
                    <Route path="/experiment-set-replicates/:id" component={ExperimentReplicates} exact={true}/>
                    <Route path="/file/:id" component={FileQCReportContainer} exact={true}/>
                    <Route path="/experiment/:id/:accession" component={Experiment} exact={true}/>
                    {/* <Route path="/experiment/:id/:accession?" component={Experiment}/> */}
                    
                    {/* <Route path="/experiments" component={ExperimentList} exact={true}/>*/}
                    <Route path="/files" component={FileMain} exact={true}/> 
                    {/* <Route path="/file/:id" component={FileQCReportContainer} exact={true}/> */}
                    <Route component={NotFoundPage}/>
                </Switch>
            {/* </Layout> */}
            {/* <Footer/> */}
        </div>
    </BrowserRouter>
);

export default AppRouter;