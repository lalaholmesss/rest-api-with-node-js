const { response } = require('express');
const pool = require('../../db.js');
const queries = require('./queries.js');

// Get all students 
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

// Get specific student data by typing their id in the url
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

// Add new student data to the database
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exists.");
        }
        
        pool.query(queries.addStudent, [ name, email, age, dob ], (error, results) => {
            if(error) throw error;
            res.status(201).send("Student created successfully."); // status 200 - success for reading, updtading, deleting;
                                                                   // status 201 - success for creating data
        });
    });
};

// Delete specific student data by typing their id in the url
const deleteStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("Student doesn't exist in the database.");
        }

        pool.query(queries.deleteStudentById, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Student removed successfully.");
        });
    });
};

// Update specific student data(name) by typing their id in the url
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("Student doesn't exist in the database.");
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Student successfully updated."); // why 200 and not 201?
        });
       
    });
};

module.exports = {
    getStudents, 
    getStudentById,
    addStudent,
    deleteStudentById,
    updateStudent,
};