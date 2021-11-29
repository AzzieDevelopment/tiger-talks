-- *****************************************************
-- USERS

INSERT INTO azziedev_tigertalks.user VALUES (
	"dbrim1", #ID
	"Dorian", #FNAME
	"Brim", #LNAME
	"test@something.com", #EMAIL
	1, #USER_TYPE
	1, #PERMISSIONS
	"This is a bio, I am Dorian, how are you", #BIO
	"Dorio", #PNAME
	"he/him", #PRONOUNS
	TRUE, #IS_VERFIED
	"$2b$10$SOYIPstozo1kCRbeLYdAFuX/vmRXs8CJBToQ7F83ZfVWzd88Mlpu2", #PASSWORD --Testpass1!
    "no token"
);

INSERT INTO azziedev_tigertalks.user VALUES (
	"gcerpa1", #ID
	"Gabriel", #FNAME
	"Cerpa", #LNAME
	"email@example.com", #EMAIL
	1, #USER_TYPE
	0, #PERMISSIONS
	"I am Gabe, and I am awesome but I don't want to admit it.", #BIO
	"Gabe", #PNAME
	"he/him", #PRONOUNS
	TRUE, #IS_VERFIED
	"$2b$10$47Eu6oTwWg/8yHoeXLZy5OMbhAXoFG5Pgjzkj7LOo235vjDcFVQcO", #PASSWORD --Testpass2!
    "no token"
);

INSERT INTO azziedev_tigertalks.user VALUES (
	"rpisci1", #ID
	"Ralph", #FNAME
	"Pisciotta", #LNAME
	"eggs@example.com", #EMAIL
	0, #USER_TYPE
	1, #PERMISSIONS
	"Ralph John", #BIO
	"RJ", #PNAME
	"they/them", #PRONOUNS
	TRUE, #IS_VERFIED
	"$2b$10$VEcyCwbO31udJMORnHR5oOVYA0xzs0qoeMvWriZolzO5tVuwPrUHG", #PASSWORD --Testpass3!
    "no token"
);

INSERT INTO azziedev_tigertalks.student VALUES (
	"dbrim1", #USERID
    "Computer Science", #MAJOR
    "N/A", #MINOR
    "Software Engineering", #TRACK
    "2021" #GRAD_YEAR
);

INSERT INTO azziedev_tigertalks.student VALUES (
	"gcerpa1", #USERID
    "English", #MAJOR
    "Film", #MINOR
    "Writing", #TRACK
    "2022" #GRAD_YEAR
);

INSERT INTO azziedev_tigertalks.faculty VALUES (
	"rpisci1", #USERID
    "mr", #TITLE
    "Computer Sciences" #DEPARTMENT
);

-- *****************************************************
-- TIGER SPACES

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	1, #ID
    "gcerpa1", #USERID
    "College of Business and Economics (CBE)", #TITLE
    "The Tiger Space for posts related to CBE.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	2, #ID
    "gcerpa1", #USERID
    "College of Education", #TITLE
    "The Tiger Space for posts related to the College of Education.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	3, #ID
    "gcerpa1", #USERID
    "College of Fine Arts and Communication (CFA)", #TITLE
    "The Tiger Space for posts related to CFA.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	4, #ID
    "gcerpa1", #USERID
    "College of Health Professionals (CHP)", #TITLE
    "The Tiger Space for posts related to CHP.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	5, #ID
    "gcerpa1", #USERID
    "College of Liberal Arts (CLA)", #TITLE
    "The Tiger Space for posts related to CLA.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	6, #ID
    "gcerpa1", #USERID
    "Fisher College of Science and Mathematics (FCSM)", #TITLE
    "The Tiger Space for posts related to FCSM.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	7, #ID
    "gcerpa1", #USERID
    "Honors College", #TITLE
    "The Tiger Space for posts related to the Honors College.", #DESCRIPTION
    1 #TYPE -- Academic
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	8, #ID
    "gcerpa1", #USERID
    "Housing", #TITLE
    "The Tiger Space for posts related to housing at Towson University.", #DESCRIPTION
    2 #TYPE -- Social
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	9, #ID
    "gcerpa1", #USERID
    "Clubs and Organizations", #TITLE
    "The Tiger Space for posts related to clubs and organizations at Towson University.", #DESCRIPTION
    2 #TYPE -- Social
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	10, #ID
    "gcerpa1", #USERID
    "Campus Life", #TITLE
    "The Tiger Space for posts related to campus life at Towson University.", #DESCRIPTION
    2 #TYPE -- Social
);

-- *****************************************************
-- POSTS

INSERT INTO azziedev_tigertalks.post VALUES (
	1, #ID
	"My story", #TITLE
    "This is my story I hope you all like it", #BODY
    "Category1", #CATEGORY
    100, #UpvoteS
    NOW(), #TIMESTAMP
    NOW(), #BUMP
    "gcerpa1", #USERID
    1 #TIGERSPACEID
);

-- *****************************************************
-- COMMENTS
