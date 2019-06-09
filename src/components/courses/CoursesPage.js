import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types';
//
import { bindActionCreators } from 'redux'
import CourseList from './CourseList';


class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed " + error)
            });
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed " + error)
            });
        }
    }
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         course: {
    //             title: ""
    //         }
    //     };

    // }
    // //class field.  Arrow functions inherit the binding context of their enclosed scope
    // handleChange = (event) => {
    //     // Using a spread operator... to copy the current course from state and set to a new value
    //     // since we want the state to be immutable, we created a copy of the state before setting the state
    //     const course = { ...this.state.course, title: event.target.value };
    //     this.setState({ course })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     //dispatch is needed to run the function
    //     this.props.actions.createCourse(this.state.course);
    // }
    render() {
        return (
            //On submit on the form makes it so the user can submit a form by pushing enter
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />

            </>
        );
    }
}
CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            }
        }),
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //bindActionCreators takes actions or functions returns an oject wrapped in a call to dispatch
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //if second argument is ommited the connect fucntion will pass dispatch