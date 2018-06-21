import React from 'react';

//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import BannerHeader from './BannerHeader.jsx';
import ShowCohort from './ShowCohort.jsx';

//create your first component
export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataApiAllCohorts: [],
            optionSelected: '',
            show: false
        }
    }

    componentDidMount(){
        this.getApiCohort();
    }

    //Consulta API
	getApiCohort(){
        var currentURL = window.location.href;
        var parts = currentURL.split('?');
        var lastSegment = parts.pop() || parts.pop();

        let endpoint;
        if(lastSegment > 0){
            endpoint = 'https://talenttree-alesanchezr.c9users.io/cohorts/teacher/'+lastSegment+'?access_token=7677557f945439bb97b072b7078c970218d9a470';
        }else{
            endpoint = 'https://talenttree-alesanchezr.c9users.io/cohorts/';
        }

        //let endpoint = 'https://talenttree-alesanchezr.c9users.io/cohorts/';
        console.log(endpoint);
		fetch(endpoint)
		.then((response) => {
            if (!response.ok) { throw response }else{
                return response.json();
            }
            // if(response.status == 400){
            //     return response.status
            // }else if(response.status == 401){
            //     return response.status
            // }else if(response.status == 200){
            //     return response.json();
            // }
		})
		.then((data) => {
            let dataCohort = data
			this.setState({
				dataApiAllCohorts: dataCohort.data
            });
		})
		.catch((error) => {
			console.log('error', error);
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            show: true
        });
    }

    handleChange(event){
        let x = event.target.value;
        let eventArray = x.split(",");
        this.setState({
            optionSelected: eventArray
        });
    }

    getDataNew(data){
        console.log(data)
        this.setState({
            optionSelected: data
        });
    }

    render(){
        
            const optionSelect = this.state.dataApiAllCohorts.map((val, key)=>(
                <option value={[val.profile_slug, val.slug]} key={key}>{val.name}</option>
            ));
        

        return (
            (this.state.show) ?
            <div>
                <ShowCohort data={this.state.optionSelected} getData={(data)=>this.getDataNew(data)}/> 
            </div> :
            <div>
                <BannerHeader/>
                <div className="alert alert-primary">
                    <h4 className="alert-heading">Type a cohort to update or create a new one:</h4>
                    <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="form-row justify-content-md-center banner-form">
                        <div className="form-group col-md-4 no-margin">
                            <select className="custom-select" onChange={(event)=>this.handleChange(event)}>
                                <option defaultValue="default">Select a cohort to edit the replits</option>
                                {optionSelect}
                            </select>
                        </div>
                        <div className="form-group col-3 no-margin">
                            <button type="submit" className="btn btn-light form-control">START</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}
