CREATE TABLE [dbo].[PersonInformation]
(
	[PersonId] INT identity PRIMARY KEY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [MiddleName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Address] VARCHAR(100) NOT NULL, 
    [City] VARCHAR(50) NOT NULL, 
    [State] VARCHAR(50) NOT NULL, 
    [PhoneNo] VARCHAR(50) NULL, 
    [MobileNo] VARCHAR(50) NULL, 
    [EmailAddress] VARCHAR(50) NOT NULL, 
    [Occupation] VARCHAR(50) NOT NULL
)
