import Flux from '@4geeksacademy/react-flux-dash';

export const setReplitsInputs = (cohort)=>{
    let endpoint = 'https://assets.breatheco.de/apis/replit/cohort/'+cohort;
    fetch(endpoint)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            Flux.dispatchEvent('replits', data);
        })
        .catch((error) => {
            console.log('error', error);
        });
}

class _store extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent('replits');
        this.addEvent('profile');
    }
}

export let store = new _store();