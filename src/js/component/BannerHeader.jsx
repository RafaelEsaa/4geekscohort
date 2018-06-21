import React from 'react';

//include images into your bundle
import rigoImage from '../../img/logo.png';

export default class BannerHeader extends React.Component{
    constructor(props){
        super(props);
    }

    handleStructureJson(filename){
        let fileJson = {
            cohortSlug: this.props.createJson[0],
            cohortBody: this.props.createJson[1]
        };
        console.log(fileJson);
        const text = JSON.stringify(fileJson);
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
    }

    render(){
        return (
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand" href="#">
                            <img src={rigoImage} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                            Cohort Maker - BreatheCode
                        </a>
                        {(this.props.button) ? 
                            <button 
                                type="button" 
                                className="btn btn-primary float-right"
                                onClick={()=>this.handleStructureJson("quiz.json")}>    
                            download progress</button>
                            : <span></span>
                        }
                    </nav>
                </div>
            </div>
        );
    }
}
