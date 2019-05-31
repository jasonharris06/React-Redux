import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from 'prop-types';
//
import { bindActionCreators } from 'redux'


class CoursesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: ""
            }
        };

    }
    //class field.  Arrow functions inherit the binding context of their enclosed scope
    handleChange = (event) => {
        // Using a spread operator... to copy the current course from state and set to a new value
        // since we want the state to be immutable, we created a copy of the state before setting the state
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //dispatch is needed to run the function
        this.props.actions.createCourse(this.state.course);
    }
    render() {
        return (
            //On submit on the form makes it so the user can submit a form by pushing enter
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input
                    type="text"

                    onChange={this.handleChange}
                    value={this.state.course.title}
                />
                <input type="submit" value="Save" />
                {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
        );
    }
}
CoursesPage.propTypes = {
    createCourse: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //bindActionCreators talkes actions or functions returns an oject wrapped in a call to dispatch
        actions: bindActionCreators(courseActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //if second argument is ommited the connect fucntion will pass dispatch