import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from "../../../tools/mockData"


function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, ...props }) { //...props is a rest operator assign any props that haven't been destructured on the left and is called props
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {


        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed " + error)
            });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed " + error)
            });
        }


    }, []); //you can add a second argument on the effect and if there is any new information it will run.  The empty array means the effect will run once when the component mounts 

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }
    return (

        <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} />
    );

}
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {

    //bindActionCreators takes actions or functions returns an oject wrapped in a call to dispatch
    actions: {
        loadCourses: courseActions.loadCourses,
        loadAuthors: authorActions.loadAuthors
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); //if second argument is ommited the connect fucntion will pass dispatch
