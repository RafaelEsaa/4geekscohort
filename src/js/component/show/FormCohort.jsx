import React from 'react';
import 'jquery';

export default class FormCohort extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputs: [],
            labelsAndInpus: [],

            labels: [],
            inputs: [],
            dataForm: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        // if (nextProps.data != prevState.labelsAndInpus) {
        //     return { labelsAndInpus: nextProps.data}
        // }
        if (nextProps.dataOne != prevState.labels && nextProps.dataTwo != prevState.inputs) {
            // if(prevState.cohortLabel && prevState.cohortDataInput){
                
                    let filterItemsExistsInObject2 = nextProps.dataOne.reduce((acc, next) => {
                        if (nextProps.dataTwo[next.slug]) {
                            if (nextProps.dataTwo.hasOwnProperty(next.slug)) {
                                if (acc[next.slug] = nextProps.dataTwo[next.slug]) {
                                    return acc
                                }
                            } else {
                                return acc
                            }
                        }
                        return acc
                        }, {})
                            
                        let filterItemsNoExistsInObject2 = nextProps.dataOne.filter(f => !filterItemsExistsInObject2.hasOwnProperty(f.slug));
                        filterItemsNoExistsInObject2.map(item => filterItemsExistsInObject2[item.slug] = "");
                        let arrayForm = Object.entries(filterItemsExistsInObject2);
        
                        return { dataForm: arrayForm, labels: nextProps.dataOne, inputs: nextProps.dataTwo}
                
            // }
            
            return { labels: nextProps.dataOne, inputs: nextProps.dataTwo }
        }
        return null;
    }

    // handleChange(event, key){
    //     let change = null;
    //     change = this.state.labelsAndInpus.map((data, i)=>{
    //         if(i == key){
    //             return [data[0], event.target.value ]
    //         }else{
    //             return data;
    //         }
    //     });
    //     console.log(change);
        
    //     this.setState({
    //         labelsAndInpus: change
    //     });
    //     this.props.getData(change);
    // }

    handleChange(event, key){
        let change = null;
        change = this.state.dataForm.map((data, i)=>{
            if(i == key){
                return [data[0], event.target.value ]
            }else{
                return data;
            }
        });
        
        this.setState({
            dataForm: change
        });
        this.props.getData(change);
    }

    render(){

        // let form = this.state.labelsAndInpus.map((value, i)=>{
        //     return(
        //         <div className="form-group row" key={i}>
        //             <label className="col-md-2 col-form-label">{value[0]}:</label>
        //             <div className="col-md-10">
        //             <input key={i}
        //                 type="text" 
        //                 className="form-control" 
        //                 placeholder=""
        //                 value={value[1]}
        //                 onChange={(event)=>this.handleChange(event, i)} />
        //             </div>
        //         </div>
        //     )
        // });

        let form = this.state.dataForm.map((value, i)=>{
            return(
                <div className="form-group row" key={i}>
                    <label className="col-md-2 col-form-label">{value[0]}:</label>
                    <div className="col-md-10">
                    <input key={i}
                        type="text" 
                        className="form-control" 
                        placeholder=""
                        value={value[1]}
                        onChange={(event)=>this.handleChange(event, i)} />
                    </div>
                </div>
            )
        });

        return (
            <div className="alert alert-primary section-slug-show no-margin">
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <form>
                            {form}
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }
}
