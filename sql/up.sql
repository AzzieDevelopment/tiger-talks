CREATE TABLE tigerhacks_schema.user (
    Id INT UNSIGNED NOT NULL,
    FirstName VARCHAR(64) NOT NULL,
    LastName VARCHAR(64) NOT NULL,
    Email VARCHAR(64) NOT NULL UNIQUE,
    UserType TINYINT NOT NULL,
    Permission TINYINT NOT NULL,
    Bio VARCHAR(512),
    PName VARCHAR(256),
    Pronouns VARCHAR(16),
    IsVerified BOOL NOT NULL,
    Password VARCHAR(120),
    PRIMARY KEY(Id)
    );
    
CREATE TABLE tigerhacks_schema.student (
	UserId INT UNSIGNED NOT NULL,
	Major VARCHAR(32) NOT NULL,
	Minor VARCHAR(32),
	Track VARCHAR(32),
	GradYear varchar(4),
	PRIMARY KEY(UserId),
	FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.faculty (
	UserId INT UNSIGNED NOT NULL,
	Title VARCHAR(32) NOT NULL,
    Department VARCHAR(32) NOT NULL,
	PRIMARY KEY(UserId),
	FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.tigerspace (
	Id INT UNSIGNED NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    Title VARCHAR(64) NOT NULL,
    Description VARCHAR(512) NOT NULL,
    Type TINYINT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.post (
	Id INT UNSIGNED NOT NULL,
    Title VARCHAR(64) UNIQUE NOT NULL,
    Body VarChar(2048) NOT NULL,
    Category VARCHAR(32) NOT NULL,
    Upvotes INT UNSIGNED NOT NULL,
    Timestamp DATETIME NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    TIgerSpaceId INT UNSIGNED NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(TigerSpaceId) References tigerhacks_schema.tigerspace(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.comment (
	Id INT UNSIGNED NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    PostId INT UNSIGNED NOT NULL,
    Timestamp DATETIME NOT NULL,
    Body VARCHAR(512) NOT NULL,
    Upvotes INT UNSIGNED NOT NULL,
    Primary Key (Id),
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(PostId) References tigerhacks_schema.post(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.follow (
	UserId INT UNSIGNED NOT NULL,
    TigerSpaceId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(TigerSpaceId) References tigerhacks_schema.tigerspace(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.flaggedpost (
	UserId INT UNSIGNED NOT NULL,
    PostId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(PostId) References tigerhacks_schema.post(Id) ON DELETE CASCADE
);

CREATE TABLE tigerhacks_schema.flaggedcomment (
	UserId INT UNSIGNED NOT NULL,
    CommentId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References tigerhacks_schema.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(CommentId) References tigerhacks_schema.comment(Id) ON DELETE CASCADE
);