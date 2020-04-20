import React, {Component,Fragment} from 'react';

const withErrorHandler = (HoverMessage, axios) => {
    return class extends Component{
        state={
            error: null
        };

        int1=null;
        int2=null;

        componentDidMount() {
            this.int1 = axios.interceptors.request.use(null,req =>{
                this.setState({error: null});
                return req;
            });
            this.int2 = axios.interceptors.response.use(res => res,error =>{
                this.setState({error: error});
                return error;
            });
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.int2);
            axios.interceptors.request.eject(this.int1);
        }

        render(){
            return (
                <Fragment>
                    <HoverMessage {...this.props}
                                      errorMessage={this.state.error ? this.state.error.message : null}
                    />
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;