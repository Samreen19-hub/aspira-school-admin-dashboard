// ─── Students ────────────────────────────────────────────────────────────────
export const students = [
  { id: 1, name: "Ananya Sharma", rollNo: "GHS001", class: "10-A", grade: "10", section: "A", gender: "Female", dob: "2009-03-12", phone: "+91 98765 11001", email: "ananya.s@student.greenfieldschool.edu.in", address: "12, MG Road, Bangalore", parent: "Priya Sharma", status: "Active", score: 98.6, avatar: "AS", feesPaid: true },
  { id: 2, name: "Rohan Verma", rollNo: "GHS002", class: "10-A", grade: "10", section: "A", gender: "Male", dob: "2009-07-22", phone: "+91 98765 11002", email: "rohan.v@student.greenfieldschool.edu.in", address: "34, Koramangala, Bangalore", parent: "Rahul Verma", status: "Active", score: 97.4, avatar: "RV", feesPaid: true },
  { id: 3, name: "Diya Patel", rollNo: "GHS003", class: "10-B", grade: "10", section: "B", gender: "Female", dob: "2009-11-05", phone: "+91 98765 11003", email: "diya.p@student.greenfieldschool.edu.in", address: "56, Indiranagar, Bangalore", parent: "Meera Patel", status: "Active", score: 96.8, avatar: "DP", feesPaid: false },
  { id: 4, name: "Arjun Singh", rollNo: "GHS004", class: "10-B", grade: "10", section: "B", gender: "Male", dob: "2009-04-18", phone: "+91 98765 11004", email: "arjun.s@student.greenfieldschool.edu.in", address: "78, Whitefield, Bangalore", parent: "Vikram Singh", status: "Active", score: 95.6, avatar: "AS", feesPaid: true },
  { id: 5, name: "Meera Iyer", rollNo: "GHS005", class: "10-A", grade: "10", section: "A", gender: "Female", dob: "2009-09-30", phone: "+91 98765 11005", email: "meera.i@student.greenfieldschool.edu.in", address: "90, Jayanagar, Bangalore", parent: "Sunita Iyer", status: "Active", score: 94.7, avatar: "MI", feesPaid: true },
  { id: 6, name: "Karan Mehta", rollNo: "GHS006", class: "9-A", grade: "9", section: "A", gender: "Male", dob: "2010-02-14", phone: "+91 98765 11006", email: "karan.m@student.greenfieldschool.edu.in", address: "23, HSR Layout, Bangalore", parent: "Raj Mehta", status: "Active", score: 88.2, avatar: "KM", feesPaid: true },
  { id: 7, name: "Priya Nair", rollNo: "GHS007", class: "9-B", grade: "9", section: "B", gender: "Female", dob: "2010-06-20", phone: "+91 98765 11007", email: "priya.n@student.greenfieldschool.edu.in", address: "45, BTM Layout, Bangalore", parent: "Anita Nair", status: "Inactive", score: 76.5, avatar: "PN", feesPaid: false },
  { id: 8, name: "Sahil Gupta", rollNo: "GHS008", class: "8-A", grade: "8", section: "A", gender: "Male", dob: "2011-08-10", phone: "+91 98765 11008", email: "sahil.g@student.greenfieldschool.edu.in", address: "67, Banashankari, Bangalore", parent: "Suresh Gupta", status: "Active", score: 82.3, avatar: "SG", feesPaid: true },
  { id: 9, name: "Nisha Reddy", rollNo: "GHS009", class: "8-B", grade: "8", section: "B", gender: "Female", dob: "2011-01-25", phone: "+91 98765 11009", email: "nisha.r@student.greenfieldschool.edu.in", address: "89, Electronic City, Bangalore", parent: "Sneha Reddy", status: "Active", score: 91.0, avatar: "NR", feesPaid: true },
  { id: 10, name: "Aditya Kumar", rollNo: "GHS010", class: "7-A", grade: "7", section: "A", gender: "Male", dob: "2012-03-05", phone: "+91 98765 11010", email: "aditya.k@student.greenfieldschool.edu.in", address: "12, Marathahalli, Bangalore", parent: "Suresh Kumar", status: "Active", score: 85.8, avatar: "AK", feesPaid: false },
]

// ─── Teachers ─────────────────────────────────────────────────────────────────
export const teachers = [
  { id: 1, name: "Dr. Anita Roy", empId: "TCH001", subject: "Mathematics", qualification: "Ph.D Mathematics", experience: "12 years", phone: "+91 98765 43201", email: "anita.roy@greenfieldschool.edu.in", classes: ["10-A", "10-B", "9-A"], status: "Active", avatar: "AR", joinDate: "2012-06-01", salary: 85000 },
  { id: 2, name: "Mr. Suresh Patel", empId: "TCH002", subject: "Science", qualification: "M.Sc Physics", experience: "8 years", phone: "+91 98765 43202", email: "suresh.patel@greenfieldschool.edu.in", classes: ["10-A", "9-B"], status: "Active", avatar: "SP", joinDate: "2016-07-15", salary: 72000 },
  { id: 3, name: "Ms. Kavitha Rao", empId: "TCH003", subject: "English", qualification: "M.A English", experience: "6 years", phone: "+91 98765 43203", email: "kavitha.rao@greenfieldschool.edu.in", classes: ["10-B", "8-A"], status: "Active", avatar: "KR", joinDate: "2018-06-01", salary: 65000 },
  { id: 4, name: "Mr. Ramesh Nair", empId: "TCH004", subject: "History", qualification: "M.A History", experience: "10 years", phone: "+91 98765 43204", email: "ramesh.nair@greenfieldschool.edu.in", classes: ["9-A", "9-B", "8-B"], status: "Active", avatar: "RN", joinDate: "2014-07-01", salary: 70000 },
  { id: 5, name: "Ms. Divya Sharma", empId: "TCH005", subject: "Computer Science", qualification: "MCA", experience: "5 years", phone: "+91 98765 43205", email: "divya.sharma@greenfieldschool.edu.in", classes: ["10-A", "10-B"], status: "Active", avatar: "DS", joinDate: "2019-06-10", salary: 78000 },
  { id: 6, name: "Mr. Prakash Kumar", empId: "TCH006", subject: "Physical Education", qualification: "M.P.Ed", experience: "7 years", phone: "+91 98765 43206", email: "prakash.kumar@greenfieldschool.edu.in", classes: ["All Grades"], status: "Active", avatar: "PK", joinDate: "2017-07-01", salary: 55000 },
  { id: 7, name: "Mrs. Lalitha Menon", empId: "TCH007", subject: "Art & Craft", qualification: "M.F.A", experience: "9 years", phone: "+91 98765 43207", email: "lalitha.menon@greenfieldschool.edu.in", classes: ["7-A", "7-B", "8-A"], status: "On Leave", avatar: "LM", joinDate: "2015-06-01", salary: 60000 },
  { id: 8, name: "Dr. Vijay Krishnan", empId: "TCH008", subject: "Biology", qualification: "Ph.D Biology", experience: "15 years", phone: "+91 98765 43208", email: "vijay.krishnan@greenfieldschool.edu.in", classes: ["10-A", "10-B", "9-A"], status: "Active", avatar: "VK", joinDate: "2009-07-01", salary: 92000 },
]

// ─── Classes ──────────────────────────────────────────────────────────────────
export const classes = [
  { id: 1, name: "10-A", grade: "10", section: "A", classTeacher: "Dr. Anita Roy", students: 42, room: "Room 201", timing: "8:00 AM - 2:30 PM", subjects: ["Mathematics", "Science", "English", "History", "Computer Science", "Physical Education"], status: "Active" },
  { id: 2, name: "10-B", grade: "10", section: "B", classTeacher: "Ms. Kavitha Rao", students: 40, room: "Room 202", timing: "8:00 AM - 2:30 PM", subjects: ["Mathematics", "Science", "English", "History", "Computer Science", "Biology"], status: "Active" },
  { id: 3, name: "9-A", grade: "9", section: "A", classTeacher: "Mr. Ramesh Nair", students: 45, room: "Room 203", timing: "8:00 AM - 2:30 PM", subjects: ["Mathematics", "Science", "English", "History", "Computer Science"], status: "Active" },
  { id: 4, name: "9-B", grade: "9", section: "B", classTeacher: "Mr. Suresh Patel", students: 43, room: "Room 204", timing: "8:00 AM - 2:30 PM", subjects: ["Mathematics", "Science", "English", "History", "Art & Craft"], status: "Active" },
  { id: 5, name: "8-A", grade: "8", section: "A", classTeacher: "Ms. Divya Sharma", students: 38, room: "Room 301", timing: "8:00 AM - 2:00 PM", subjects: ["Mathematics", "Science", "English", "History", "Art & Craft"], status: "Active" },
  { id: 6, name: "8-B", grade: "8", section: "B", classTeacher: "Dr. Vijay Krishnan", students: 36, room: "Room 302", timing: "8:00 AM - 2:00 PM", subjects: ["Mathematics", "Science", "English", "History", "Computer Science"], status: "Active" },
  { id: 7, name: "7-A", grade: "7", section: "A", classTeacher: "Mrs. Lalitha Menon", students: 40, room: "Room 303", timing: "8:00 AM - 2:00 PM", subjects: ["Mathematics", "Science", "English", "History", "Art & Craft"], status: "Active" },
  { id: 8, name: "7-B", grade: "7", section: "B", classTeacher: "Mr. Prakash Kumar", students: 39, room: "Room 304", timing: "8:00 AM - 2:00 PM", subjects: ["Mathematics", "Science", "English", "History", "Physical Education"], status: "Active" },
]

// ─── Timetable ────────────────────────────────────────────────────────────────
export const timetableData = {
  "10-A": {
    Monday: [
      { period: 1, time: "8:00-8:45", subject: "Mathematics", teacher: "Dr. Anita Roy" },
      { period: 2, time: "8:45-9:30", subject: "Science", teacher: "Mr. Suresh Patel" },
      { period: 3, time: "9:30-10:15", subject: "English", teacher: "Ms. Kavitha Rao" },
      { period: 4, time: "10:30-11:15", subject: "History", teacher: "Mr. Ramesh Nair" },
      { period: 5, time: "11:15-12:00", subject: "Computer Science", teacher: "Ms. Divya Sharma" },
      { period: 6, time: "1:00-1:45", subject: "Physical Education", teacher: "Mr. Prakash Kumar" },
    ],
    Tuesday: [
      { period: 1, time: "8:00-8:45", subject: "English", teacher: "Ms. Kavitha Rao" },
      { period: 2, time: "8:45-9:30", subject: "Mathematics", teacher: "Dr. Anita Roy" },
      { period: 3, time: "9:30-10:15", subject: "Biology", teacher: "Dr. Vijay Krishnan" },
      { period: 4, time: "10:30-11:15", subject: "Computer Science", teacher: "Ms. Divya Sharma" },
      { period: 5, time: "11:15-12:00", subject: "History", teacher: "Mr. Ramesh Nair" },
      { period: 6, time: "1:00-1:45", subject: "Science", teacher: "Mr. Suresh Patel" },
    ],
    Wednesday: [
      { period: 1, time: "8:00-8:45", subject: "Science", teacher: "Mr. Suresh Patel" },
      { period: 2, time: "8:45-9:30", subject: "History", teacher: "Mr. Ramesh Nair" },
      { period: 3, time: "9:30-10:15", subject: "Mathematics", teacher: "Dr. Anita Roy" },
      { period: 4, time: "10:30-11:15", subject: "English", teacher: "Ms. Kavitha Rao" },
      { period: 5, time: "11:15-12:00", subject: "Physical Education", teacher: "Mr. Prakash Kumar" },
      { period: 6, time: "1:00-1:45", subject: "Computer Science", teacher: "Ms. Divya Sharma" },
    ],
    Thursday: [
      { period: 1, time: "8:00-8:45", subject: "Computer Science", teacher: "Ms. Divya Sharma" },
      { period: 2, time: "8:45-9:30", subject: "Biology", teacher: "Dr. Vijay Krishnan" },
      { period: 3, time: "9:30-10:15", subject: "Science", teacher: "Mr. Suresh Patel" },
      { period: 4, time: "10:30-11:15", subject: "Mathematics", teacher: "Dr. Anita Roy" },
      { period: 5, time: "11:15-12:00", subject: "English", teacher: "Ms. Kavitha Rao" },
      { period: 6, time: "1:00-1:45", subject: "History", teacher: "Mr. Ramesh Nair" },
    ],
    Friday: [
      { period: 1, time: "8:00-8:45", subject: "Biology", teacher: "Dr. Vijay Krishnan" },
      { period: 2, time: "8:45-9:30", subject: "Physical Education", teacher: "Mr. Prakash Kumar" },
      { period: 3, time: "9:30-10:15", subject: "History", teacher: "Mr. Ramesh Nair" },
      { period: 4, time: "10:30-11:15", subject: "Science", teacher: "Mr. Suresh Patel" },
      { period: 5, time: "11:15-12:00", subject: "Mathematics", teacher: "Dr. Anita Roy" },
      { period: 6, time: "1:00-1:45", subject: "English", teacher: "Ms. Kavitha Rao" },
    ],
  },
}

// ─── Exams ────────────────────────────────────────────────────────────────────
export const exams = [
  { id: 1, name: "Mid-Term Examination", type: "Mid-Term", classes: ["9-A", "9-B", "10-A", "10-B"], startDate: "2025-09-15", endDate: "2025-09-22", totalMarks: 100, passingMarks: 35, status: "Upcoming" },
  { id: 2, name: "Unit Test 1", type: "Unit Test", classes: ["All Classes"], startDate: "2025-07-10", endDate: "2025-07-14", totalMarks: 50, passingMarks: 20, status: "Upcoming" },
  { id: 3, name: "Annual Examination 2024-25", type: "Annual", classes: ["All Classes"], startDate: "2025-03-01", endDate: "2025-03-20", totalMarks: 100, passingMarks: 35, status: "Completed" },
  { id: 4, name: "Pre-Board Examination", type: "Pre-Board", classes: ["10-A", "10-B"], startDate: "2025-01-15", endDate: "2025-01-25", totalMarks: 100, passingMarks: 35, status: "Completed" },
  { id: 5, name: "Half-Yearly Examination", type: "Half-Yearly", classes: ["All Classes"], startDate: "2024-11-04", endDate: "2024-11-15", totalMarks: 100, passingMarks: 35, status: "Completed" },
]

export const examResults = [
  { student: "Ananya Sharma", rollNo: "GHS001", class: "10-A", math: 98, science: 95, english: 99, history: 96, cs: 100, total: 488, percentage: 97.6, grade: "A+" },
  { student: "Rohan Verma", rollNo: "GHS002", class: "10-A", math: 92, science: 88, english: 90, history: 85, cs: 95, total: 450, percentage: 90.0, grade: "A+" },
  { student: "Diya Patel", rollNo: "GHS003", class: "10-B", math: 85, science: 88, english: 92, history: 90, cs: 78, total: 433, percentage: 86.6, grade: "A" },
  { student: "Arjun Singh", rollNo: "GHS004", class: "10-B", math: 90, science: 82, english: 78, history: 88, cs: 92, total: 430, percentage: 86.0, grade: "A" },
  { student: "Meera Iyer", rollNo: "GHS005", class: "10-A", math: 88, science: 91, english: 95, history: 87, cs: 85, total: 446, percentage: 89.2, grade: "A+" },
]

// ─── Fees ─────────────────────────────────────────────────────────────────────
export const feesData = [
  { id: 1, student: "Ananya Sharma", rollNo: "GHS001", class: "10-A", feeType: "Tuition Fee", amount: 25000, paid: 25000, due: 0, dueDate: "2025-04-30", status: "Paid", paidDate: "2025-04-15" },
  { id: 2, student: "Rohan Verma", rollNo: "GHS002", class: "10-A", feeType: "Tuition Fee", amount: 25000, paid: 25000, due: 0, dueDate: "2025-04-30", status: "Paid", paidDate: "2025-04-10" },
  { id: 3, student: "Diya Patel", rollNo: "GHS003", class: "10-B", feeType: "Tuition Fee", amount: 25000, paid: 0, due: 25000, dueDate: "2025-04-30", status: "Overdue", paidDate: null },
  { id: 4, student: "Arjun Singh", rollNo: "GHS004", class: "10-B", feeType: "Tuition Fee", amount: 25000, paid: 12500, due: 12500, dueDate: "2025-05-31", status: "Partial", paidDate: "2025-04-20" },
  { id: 5, student: "Meera Iyer", rollNo: "GHS005", class: "10-A", feeType: "Tuition Fee", amount: 25000, paid: 25000, due: 0, dueDate: "2025-04-30", status: "Paid", paidDate: "2025-04-05" },
  { id: 6, student: "Karan Mehta", rollNo: "GHS006", class: "9-A", feeType: "Tuition Fee", amount: 22000, paid: 22000, due: 0, dueDate: "2025-04-30", status: "Paid", paidDate: "2025-04-12" },
  { id: 7, student: "Priya Nair", rollNo: "GHS007", class: "9-B", feeType: "Tuition Fee", amount: 22000, paid: 0, due: 22000, dueDate: "2025-04-30", status: "Overdue", paidDate: null },
  { id: 8, student: "Sahil Gupta", rollNo: "GHS008", class: "8-A", feeType: "Tuition Fee", amount: 20000, paid: 20000, due: 0, dueDate: "2025-04-30", status: "Paid", paidDate: "2025-04-18" },
]

// ─── Admissions ───────────────────────────────────────────────────────────────
export const admissions = [
  { id: 1, name: "Aanya Kapoor", grade: "1", dob: "2019-05-10", parent: "Neha Kapoor", phone: "+91 98765 20001", email: "neha.kapoor@email.com", appliedDate: "2025-04-01", status: "New Applications", documents: true },
  { id: 2, name: "Ishaan Malhotra", grade: "6", dob: "2013-08-20", parent: "Ravi Malhotra", phone: "+91 98765 20002", email: "ravi.malhotra@email.com", appliedDate: "2025-04-03", status: "In Review", documents: true },
  { id: 3, name: "Sneha Joshi", grade: "9", dob: "2010-02-15", parent: "Sunita Joshi", phone: "+91 98765 20003", email: "sunita.joshi@email.com", appliedDate: "2025-04-05", status: "Shortlisted", documents: true },
  { id: 4, name: "Vikram Desai", grade: "3", dob: "2017-11-30", parent: "Amit Desai", phone: "+91 98765 20004", email: "amit.desai@email.com", appliedDate: "2025-04-07", status: "New Applications", documents: false },
  { id: 5, name: "Pooja Nair", grade: "7", dob: "2012-06-22", parent: "Anitha Nair", phone: "+91 98765 20005", email: "anitha.nair@email.com", appliedDate: "2025-04-08", status: "In Review", documents: true },
  { id: 6, name: "Rahul Sharma", grade: "11", dob: "2008-09-14", parent: "Mohan Sharma", phone: "+91 98765 20006", email: "mohan.sharma@email.com", appliedDate: "2025-04-10", status: "Shortlisted", documents: true },
  { id: 7, name: "Kavya Reddy", grade: "5", dob: "2015-03-28", parent: "Vijay Reddy", phone: "+91 98765 20007", email: "vijay.reddy@email.com", appliedDate: "2025-04-12", status: "New Applications", documents: true },
  { id: 8, name: "Aditya Gupta", grade: "2", dob: "2018-07-19", parent: "Priya Gupta", phone: "+91 98765 20008", email: "priya.gupta@email.com", appliedDate: "2025-04-14", status: "In Review", documents: false },
]

// ─── Events ───────────────────────────────────────────────────────────────────
export const events = [
  { id: 1, title: "Parent-Teacher Meeting", date: "2025-05-15", time: "10:00 AM", endTime: "1:00 PM", type: "Meeting", venue: "School Auditorium", organizer: "Principal", description: "Quarterly parent-teacher interaction to discuss student progress.", status: "Upcoming", attendees: 150 },
  { id: 2, title: "Annual Sports Day", date: "2025-05-20", time: "9:00 AM", endTime: "5:00 PM", type: "Sports", venue: "School Grounds", organizer: "Mr. Prakash Kumar", description: "Annual sports day with track and field events, team sports, and prize distribution.", status: "Upcoming", attendees: 500 },
  { id: 3, title: "Science Exhibition", date: "2025-05-25", time: "11:00 AM", endTime: "4:00 PM", type: "Academic", venue: "Science Lab & Corridor", organizer: "Mr. Suresh Patel", description: "Students showcase innovative science projects and experiments.", status: "Upcoming", attendees: 300 },
  { id: 4, title: "Inter-School Debate Competition", date: "2025-06-05", time: "9:00 AM", endTime: "3:00 PM", type: "Competition", venue: "School Auditorium", organizer: "Ms. Kavitha Rao", description: "Open competition for grades 8-12 on current affairs topics.", status: "Upcoming", attendees: 200 },
  { id: 5, title: "Annual Day Celebration", date: "2025-12-20", time: "5:00 PM", endTime: "9:00 PM", type: "Cultural", venue: "School Auditorium", organizer: "Vice Principal", description: "End-of-year cultural celebration with performances and awards.", status: "Upcoming", attendees: 800 },
  { id: 6, title: "Republic Day Celebration", date: "2025-01-26", time: "8:00 AM", endTime: "11:00 AM", type: "National", venue: "School Grounds", organizer: "Principal", description: "Flag hoisting ceremony and cultural programs.", status: "Completed", attendees: 600 },
]

// ─── Announcements ─────────────────────────────────────────────────────────────
export const announcements = [
  { id: 1, title: "New Timetable for Grade 8", content: "A new timetable for Grade 8 has been published effective from May 12, 2025. Please check the timetable section for details.", date: "2025-05-10", audience: "All", priority: "High", author: "Admin", type: "Academic" },
  { id: 2, title: "Library Closure Notice", content: "The school library will remain closed on May 12 for maintenance and inventory. It will reopen on May 13.", date: "2025-05-09", audience: "Students", priority: "Medium", author: "Librarian", type: "General" },
  { id: 3, title: "Inter-School Debate Registration Open", content: "Registration for the inter-school debate competition is now open. Interested students may contact their class teachers by May 15.", date: "2025-05-08", audience: "Students", priority: "High", author: "Ms. Kavitha Rao", type: "Event" },
  { id: 4, title: "Fee Payment Reminder", content: "This is a reminder that the last date for fee payment for Q2 2025 is May 31, 2025. Please ensure timely payment to avoid late fees.", date: "2025-05-07", audience: "Parents", priority: "High", author: "Accounts", type: "Finance" },
  { id: 5, title: "Summer Vacation Schedule", content: "Summer vacation will begin from June 1, 2025 and school will reopen on June 23, 2025.", date: "2025-05-06", audience: "All", priority: "Medium", author: "Principal", type: "Academic" },
  { id: 6, title: "New Sports Equipment Arrived", content: "New sports equipment has been added to the inventory. Students can use it during PE periods.", date: "2025-05-05", audience: "Students", priority: "Low", author: "Mr. Prakash Kumar", type: "Sports" },
]

// ─── Communications (Parent Messages) ─────────────────────────────────────────
export const communications = [
  { id: 1, parent: "Priya Sharma", student: "Ananya Sharma", class: "10-A", message: "Ananya is doing very well. We are very happy with her progress.", date: "2025-05-10", type: "Feedback", status: "Read", avatar: "PS" },
  { id: 2, parent: "Rahul Verma", student: "Rohan Verma", class: "10-A", message: "Can I schedule a meeting with the Mathematics teacher?", date: "2025-05-09", type: "Request", status: "Unread", avatar: "RV" },
  { id: 3, parent: "Suresh Kumar", student: "Aditya Kumar", class: "7-A", message: "Aditya will be absent on May 15 due to a family function.", date: "2025-05-08", type: "Leave", status: "Read", avatar: "SK" },
  { id: 4, parent: "Anita Nair", student: "Priya Nair", class: "9-B", message: "Priya has been having health issues. Please keep an eye on her.", date: "2025-05-07", type: "Health", status: "Unread", avatar: "AN" },
  { id: 5, parent: "Raj Mehta", student: "Karan Mehta", class: "9-A", message: "Please share the study material for the upcoming exam.", date: "2025-05-06", type: "Academic", status: "Read", avatar: "RM" },
  { id: 6, parent: "Neha Kapoor", student: "Aanya Kapoor", class: "Admission", message: "I would like to know the status of my admission application.", date: "2025-05-05", type: "Admission", status: "Unread", avatar: "NK" },
]

// ─── Application Trend (Chart) ────────────────────────────────────────────────
export const applicationTrend = [
  { month: "Jan", applications: 650 },
  { month: "Feb", applications: 820 },
  { month: "Mar", applications: 1100 },
  { month: "Apr", applications: 980 },
  { month: "May", applications: 1350 },
  { month: "Jun", applications: 1600 },
  { month: "Jul", applications: 2050 },
]

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const reviews = [
  { id: 1, name: "Priya Sharma", role: "Parent", rating: 5, comment: "Greenfield High School has a wonderful learning environment. My child has shown great improvement both academically and personally.", avatar: "PS" },
  { id: 2, name: "Rahul Mehta", role: "Parent", rating: 5, comment: "The teachers are very supportive and the school focuses on overall development. We are happy to be a part of Greenfield.", avatar: "RM" },
  { id: 3, name: "Sneha Reddy", role: "Student", rating: 5, comment: "I love the school! We get so many opportunities to learn, participate in activities, and grow together.", avatar: "SR" },
  { id: 4, name: "Amit Patel", role: "Parent", rating: 4, comment: "Great school with excellent faculty. The infrastructure and facilities are top-notch.", avatar: "AP" },
  { id: 5, name: "Kavya Singh", role: "Student", rating: 5, comment: "The teachers are amazing and always ready to help. I have learned so much this year!", avatar: "KS" },
]

// ─── Reports Chart Data ────────────────────────────────────────────────────────
export const attendanceData = [
  { month: "Jan", present: 95, absent: 5 },
  { month: "Feb", present: 92, absent: 8 },
  { month: "Mar", present: 97, absent: 3 },
  { month: "Apr", present: 89, absent: 11 },
  { month: "May", present: 94, absent: 6 },
  { month: "Jun", present: 91, absent: 9 },
]

export const performanceData = [
  { subject: "Mathematics", average: 82 },
  { subject: "Science", average: 79 },
  { subject: "English", average: 86 },
  { subject: "History", average: 75 },
  { subject: "CS", average: 88 },
  { subject: "Biology", average: 77 },
]

export const feeCollectionData = [
  { month: "Jan", collected: 1850000, pending: 150000 },
  { month: "Feb", collected: 1920000, pending: 80000 },
  { month: "Mar", collected: 2100000, pending: 200000 },
  { month: "Apr", collected: 1780000, pending: 320000 },
  { month: "May", collected: 1650000, pending: 450000 },
]

// ─── Messages ─────────────────────────────────────────────────────────────────
export const messages = [
  { id: 1, from: "Dr. Anita Roy", role: "Teacher", subject: "Math Syllabus Update", preview: "I have updated the math syllabus for Grade 10. Please review and confirm.", date: "2025-05-10", unread: true, avatar: "AR" },
  { id: 2, from: "Mr. Suresh Patel", role: "Teacher", subject: "Science Lab Booking", preview: "I need to book the science lab for extra classes on May 16.", date: "2025-05-09", unread: true, avatar: "SP" },
  { id: 3, from: "Priya Sharma", role: "Parent", subject: "Regarding Ananya's performance", preview: "Thank you for the report card. Ananya is very happy with her results.", date: "2025-05-08", unread: false, avatar: "PS" },
  { id: 4, from: "Ms. Kavitha Rao", role: "Teacher", subject: "Debate Competition Team", preview: "Here is the list of students selected for the inter-school debate.", date: "2025-05-07", unread: false, avatar: "KR" },
  { id: 5, from: "Mr. Ramesh Nair", role: "Teacher", subject: "History Project Submissions", preview: "All students have submitted their history projects. Results will be out next week.", date: "2025-05-06", unread: false, avatar: "RN" },
  { id: 6, from: "Raj Mehta", role: "Parent", subject: "Fee Receipt Request", preview: "Could you please send me the fee receipt for April 2025?", date: "2025-05-05", unread: true, avatar: "RM" },
]

// ─── Notices ──────────────────────────────────────────────────────────────────
export const notices = [
  { id: 1, title: "Holiday Notice - Eid ul-Fitr", content: "The school will remain closed on June 7, 2025 on account of Eid ul-Fitr. Classes will resume on June 9.", date: "2025-05-12", category: "Holiday", priority: "High" },
  { id: 2, title: "Staff Meeting - May 20", content: "A compulsory staff meeting is scheduled on May 20, 2025 at 3:00 PM in the conference room.", date: "2025-05-11", category: "Staff", priority: "High" },
  { id: 3, title: "Examination Hall Ticket Distribution", content: "Hall tickets for the annual examination will be distributed from May 25 to May 28 in respective classrooms.", date: "2025-05-10", category: "Exam", priority: "High" },
  { id: 4, title: "Book Fair - June 1-3", content: "A book fair will be held from June 1-3, 2025 in the school library. Students are encouraged to participate.", date: "2025-05-08", category: "Event", priority: "Medium" },
  { id: 5, title: "Uniform Policy Reminder", content: "All students must wear proper school uniform. Violations will be recorded from next week.", date: "2025-05-07", category: "Discipline", priority: "Medium" },
  { id: 6, title: "New Canteen Menu", content: "An updated healthy menu has been introduced in the school canteen effective from May 15.", date: "2025-05-05", category: "General", priority: "Low" },
  { id: 7, title: "Sports Day Volunteers Needed", content: "Students wishing to volunteer for Annual Sports Day on May 20 should register with Mr. Prakash Kumar by May 17.", date: "2025-05-04", category: "Sports", priority: "Medium" },
  { id: 8, title: "CBSE Registration - Grade 10 & 12", content: "CBSE board exam registration for Grade 10 and 12 students is now open. Deadline: June 30, 2025.", date: "2025-05-03", category: "Exam", priority: "High" },
]
