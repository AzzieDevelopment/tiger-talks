CREATE SCHEMA IF NOT EXISTS azziedev_tigertalk;

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.user (
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
    
CREATE TABLE IF NOT EXISTS azziedev_tigertalk.student (
	UserId INT UNSIGNED NOT NULL,
	Major VARCHAR(32) NOT NULL,
	Minor VARCHAR(32),
	Track VARCHAR(32),
	GradYear varchar(4),
	PRIMARY KEY(UserId),
	FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.faculty (
	UserId INT UNSIGNED NOT NULL,
	Title VARCHAR(32) NOT NULL,
    Department VARCHAR(32) NOT NULL,
	PRIMARY KEY(UserId),
	FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.tigerspace (
	Id INT UNSIGNED NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    Title VARCHAR(64) NOT NULL,
    Description VARCHAR(512) NOT NULL,
    Type TINYINT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.post (
	Id INT UNSIGNED NOT NULL,
    Title VARCHAR(64) UNIQUE NOT NULL,
    Body VarChar(2048) NOT NULL,
    Category VARCHAR(32) NOT NULL,
    Upvotes INT UNSIGNED NOT NULL,
    Timestamp DATETIME NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    TIgerSpaceId INT UNSIGNED NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(TigerSpaceId) References azziedev_tigertalk.tigerspace(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.comment (
	Id INT UNSIGNED NOT NULL,
    UserId INT UNSIGNED NOT NULL,
    PostId INT UNSIGNED NOT NULL,
    Timestamp DATETIME NOT NULL,
    Body VARCHAR(512) NOT NULL,
    Upvotes INT UNSIGNED NOT NULL,
    Primary Key (Id),
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(PostId) References azziedev_tigertalk.post(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.follow (
	UserId INT UNSIGNED NOT NULL,
    TigerSpaceId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(TigerSpaceId) References azziedev_tigertalk.tigerspace(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.flaggedpost (
	UserId INT UNSIGNED NOT NULL,
    PostId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(PostId) References azziedev_tigertalk.post(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS azziedev_tigertalk.flaggedcomment (
	UserId INT UNSIGNED NOT NULL,
    CommentId INT UNSIGNED NOT NULL,
    FOREIGN KEY(UserId) References azziedev_tigertalk.user(Id) ON DELETE CASCADE,
    FOREIGN KEY(CommentId) References azziedev_tigertalk.comment(Id) ON DELETE CASCADE
);