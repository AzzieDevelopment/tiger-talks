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
	"Testpass1!" #PASSWORD
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
	"Testpass2!" #PASSWORD
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
	"Testpass3!" #PASSWORD
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

INSERT INTO azziedev_tigertalks.post VALUES (
	2, #ID
	"Team CBE", #TITLE
    "The College of Business and Economics Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    435, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    2 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	3, #ID
	"Team Education", #TITLE
    "The College of Education Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    527, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    2 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	4, #ID
	"Team CFA!!!", #TITLE
    "The College of Fine Arts and Communication Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    652, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    3 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	5, #ID
	"Team CHP", #TITLE
    "The College of Health Professionals Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    495, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    4 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	6, #ID
	"Team CLA", #TITLE
    "The College of Liberal Arts Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    728, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    5 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	7, #ID
	"TEAM FCSM", #TITLE
    "The Fisher College of Science and Mathematics Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    944 #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    6 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	8, #ID
	"Team Honors", #TITLE
    "The Honors College Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    525, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    7 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	9, #ID
	"tEaM hOuSInG", #TITLE
    "The Housing Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    445, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    8 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	10, #ID
	"Team Clubs", #TITLE
    "The Clubs and Organizations Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    315, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    9 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	11, #ID
	"Team Campus Life", #TITLE
    "The Campus Life Tigerspace is the best Tigerspace of all time.", #BODY
    "Tigerspace Spirit", #CATEGORY
    415, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    10 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	13, #ID
	"hole-hearted mistake", #TITLE
    "I may or may not have put a hole in my wall, don't tell anyone!", #BODY
    "shhhhh", #CATEGORY
    192, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    8 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	15, #ID
	"Evil Plans", #TITLE
    "I think I'm going to give my students a pop quiz today because I'm feeling evil", #BODY
    "shhhhh", #CATEGORY
    738, #UpvoteS
    NOW(), #TIMESTAMP
    "rpisci1", #USERID
    6 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	16, #ID
	"The Worst Part", #TITLE
    "The worst part about discrete math was the dementors", #BODY
    "pain", #CATEGORY
    711, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    6 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	17, #ID
	"Life-Altering Decisions", #TITLE
    "I'm thinking about changing majors, what any thoughts?", #BODY
    "Advice", #CATEGORY
    133, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    8 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	18, #ID
	"Archaeology club event next Saturday!!!", #TITLE
    "We're gonna be searching for the remains of a lower leg. It'll be a real shindig.", #BODY
    "Event", #CATEGORY
    315, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    9 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	19, #ID
	"Finished 1st Year", #TITLE
    "This first year at Towson was hard. It'll get easier though, right?", #BODY
    "pain", #CATEGORY
    572, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    8 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	20, #ID
	"Study Hours", #TITLE
    "How long do you guys typically study for each class?", #BODY
    "Advice", #CATEGORY
    991, #UpvoteS
    NOW(), #TIMESTAMP
    "rpisci1", #USERID
    7 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	21, #ID
	"Online vs In-Person?", #TITLE
    "Curious on people's opinions", #BODY
    "Question", #CATEGORY
    820, #UpvoteS
    NOW(), #TIMESTAMP
    "rpisci1", #USERID
    3 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	22, #ID
	"I'm in too much debt", #TITLE
    "Theoretically speaking, if I get hit by a TU bus can I get free tuition? Asking for a friend", #BODY
    "Advice", #CATEGORY
    264, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    10 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	23, #ID
	"Study Plans", #TITLE
    "Having a Calculus study session in the library at tommorow at 4 if anyone wants to join", #BODY
    "Event", #CATEGORY
    808, #UpvoteS
    NOW(), #TIMESTAMP
    "dbrim1", #USERID
    6 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	24, #ID
	"Professor Recommendations?", #TITLE
    "I'm taking a health class next semester as an elective, any suggestions?", #BODY
    "Advice", #CATEGORY
    197, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    4 #TIGERSPACEID
);

INSERT INTO azziedev_tigertalks.post VALUES (
	25, #ID
	"", #TITLE
    "Sometimes I feel like only three people are making posts here", #CATEGORY
    349, #UpvoteS
    NOW(), #TIMESTAMP
    "gcerpa1", #USERID
    9 #TIGERSPACEID
);

-- *****************************************************
-- COMMENTS

INSERT INTO azziedev_tigertalks.comment VALUES (
	12, #ID
    "rpisci1", #USERID
    3, #POSTID
    NOW(), #TIMESTAMP
    "The College of Education doesn't even have a cool acronym.", #BODY
    660, #UpvoteS
);

INSERT INTO azziedev_tigertalks.comment VALUES (
	14, #ID
    "dbrim1", #USERID
    13, #POSTID
    NOW(), #TIMESTAMP
    "this is a public website, now everyone knows your crimes", #BODY
    416, #UpvoteS
);

INSERT INTO azziedev_tigertalks.comment VALUES (
	26, #ID
    "dbrim1", #USERID
    17, #POSTID
    NOW(), #TIMESTAMP
    "run while you still can", #BODY
    259, #UpvoteS
);

INSERT INTO azziedev_tigertalks.comment VALUES (
	27, #ID
    "rpisci1", #USERID
    19, #POSTID
    NOW(), #TIMESTAMP
    "honey, you got a big storm comin'", #BODY
    300, #UpvoteS
);

INSERT INTO azziedev_tigertalks.comment VALUES (
	28, #ID
    "rpisci1", #USERID
    22, #POSTID
    NOW(), #TIMESTAMP
    "you can't get free tuition if you're dead", #BODY
    545, #UpvoteS
);

INSERT INTO azziedev_tigertalks.comment VALUES (
	29, #ID
    "rpisci1", #USERID
    25, #POSTID
    NOW(), #TIMESTAMP
    "I don't know what you're talking about", #BODY
    336, #UpvoteS
);
