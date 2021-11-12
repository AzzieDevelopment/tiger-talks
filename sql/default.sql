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
	"$2b$10$SOYIPstozo1kCRbeLYdAFuX/vmRXs8CJBToQ7F83ZfVWzd88Mlpu2" #PASSWORD --Testpass1!
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
	"$2b$10$47Eu6oTwWg/8yHoeXLZy5OMbhAXoFG5Pgjzkj7LOo235vjDcFVQcO" #PASSWORD --Testpass2!
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
	FALSE, #IS_VERFIED
	"$2b$10$VEcyCwbO31udJMORnHR5oOVYA0xzs0qoeMvWriZolzO5tVuwPrUHG" #PASSWORD --Testpass3!
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

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	1, #ID
    "gcerpa1", #USERID
    "Creative Writing", #TITLE
    "Lets talk about creative writing!", #DESCRIPTION
    1 #TYPE
);

INSERT INTO azziedev_tigertalks.tigerspace VALUES (
	2, #ID
    "dbrim1", #USERID
    "Coding exercises", #TITLE
    "Lets write some cool and efficient code", #DESCRIPTION
    1 #TYPE
);

INSERT INTO azziedev_tigertalks.post VALUES (
	1, #ID
	"My story", #TITLE
    "This is my story I hope you all like it", #BODY
    "Category1", #CATEGORY
    100, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    1 #TIGERSPACEID
);