import React from 'react';


export default class SelectReplits extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataApiAllCohorts: [],
            profile: '',
            cohort: ''
        };
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     if (nextProps.data != prevState.selectOption) {
    //         return { selectOption: nextProps.data }
    //     }
    //     return null;
    // }

    componentDidMount(){
        this.getApiCohort();
    }

    getApiCohort(){
        let endpoint = 'https://talenttree-alesanchezr.c9users.io/cohorts/';
        console.log(endpoint);
        fetch(endpoint)
        .then((response) => {
            return response.json();
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

    handleChange(event){
        let x = event.target.value;
        let eventArray = x.split(",");
        console.log(eventArray);
        this.props.getData(eventArray)
    }

    render(){
        
        const optionSelect = this.state.dataApiAllCohorts.map((val, key)=>(
            <option value={[val.profile_slug, val.slug]} key={key}>{val.name}</option>
        ));

        return (
            <div className="form-row justify-content-md-center col-md-12 banner-form preload">
            <p className="align-middle title-preload">Cohort Name: </p>
                <div className="form-group col-md-4 no-margin no-padding">
                    <select className="custom-select" onChange={(event)=>this.handleChange(event)}>
                        <option defaultValue="default">Select a cohort to edit the replits</option>
                        {optionSelect}
                    </select>
                </div>
                <div className="form-group btn-preload">
                    <button type="button" className="btn btn-primary">Load</button>
                </div>
                <div className="form-group btn-preload">
                    <button type="button" className="btn btn-light">Cancel</button>
                </div>
            </div>
        );
    }
}
