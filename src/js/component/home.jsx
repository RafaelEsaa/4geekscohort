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
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("teacher");

        let endpoint;
        if(id || id != null){
            endpoint = process.env.hostTalentTree+'/cohorts/teacher/'+id+'?access_token=7677557f945439bb97b072b7078c970218d9a470';
        }else{
            endpoint = process.env.hostTalentTree+'/cohorts/';
        }

		fetch(endpoint)
		.then((response) => {
            if (!response.ok) { throw response }else{
                return response.json();
            }
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
        const cohort = this.state.dataApiAllCohorts.find((c)=>c.slug == event.target.value);
        this.setState({
            optionSelected: cohort
        });
    }

    getDataNew(data){
        this.setState({
            optionSelected: data
        });
    }

    render(){
        
            const optionSelect = this.state.dataApiAllCohorts.map((val, key)=>(
                <option value={val.slug} key={key}>{val.name}</option>
            ));
        return (
            (this.state.show) ?
            <div>
                <ShowCohort data={{cohortSelected: this.state.optionSelected, allCohorts: this.state.dataApiAllCohorts}}/> 
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
