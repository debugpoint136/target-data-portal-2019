import React from 'react'
// import PropTypes from 'prop-types'
import './pagination.css'

class Pagination extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentPage: null,
            pageCount: null
        }
    }

    componentWillReceiveProps(nextProps) {
        const startingPage = nextProps.startingPage
            ? this.props.startingPage
            : 1;
        const data = nextProps.data;
        
        const pageSize = nextProps.pageSize;
        let pageCount = parseInt(data.length / pageSize, 10);
        if (data.length % pageSize > 0) {
            pageCount++;
        }
        this.setState({currentPage: startingPage, pageCount: pageCount});
    }

    setCurrentPage(num) {
        this.setState({currentPage: num});
    }

    createControls() {
        let controls = [];
        const pageCount = this.state.pageCount;
        for (let i = 1; i <= pageCount; i++) {
            const baseClassName = 'pagination-controls__button';
            const activeClassName = i === this.state.currentPage
                ? `${baseClassName}--active`
                : '';
            controls.push(
                <div
                    key={i}
                    className={`${baseClassName} ${activeClassName}`}
                    onClick={() => this.setCurrentPage(i)}>
                    {i}
                </div>
            );
        }
        return controls;
    }

    createPaginatedData() {
        const data = this.props.data;
        const pageSize = this.props.pageSize;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
        return dataSlice;
    }

    render() {
        return (
            <div className='pagination'>
                <div className='pagination-controls'>
                    {this.createControls()}
                </div>
                <div className='pagination-results'>
                    {React.cloneElement(this.props.children, {
                        data: this.createPaginatedData()
                    })}
                </div>
            </div>
        );
    }
}

// Pagination.propTypes = {
//     data: React.PropTypes.array.isRequired,
//     pageSize: React.PropTypes.number.isRequired,
//     startingPage: React.PropTypes.number.isRequired
// };

Pagination.defaultProps = {
    pageSize: 5,
    startingPage: 1
};

export default Pagination