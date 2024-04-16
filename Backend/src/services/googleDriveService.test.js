// googleDriveService.test.js
const { google } = require("googleapis");

// Mock googleapis and dependencies
jest.mock("googleapis", () => {
  const mockDrive = {
    files: {
      get: jest.fn().mockResolvedValue({
        /* mock response */
      }),
      list: jest.fn().mockResolvedValue({
        /* mock response */
      }),
      // Add more methods as required by your tests
    },
  };

  return {
    google: {
      auth: {
        OAuth2: jest.fn().mockImplementation(() => ({
          generateAuthUrl: jest.fn().mockReturnValue("https://auth.url"),
          setCredentials: jest.fn(),
        })),
      },
      drive: jest.fn(() => mockDrive),
    },
  };
});

const {
  redirectToGoogle,
  handleGoogleCallback,
  listFiles,
  previewFile,
  downloadFile,
} = require("./googleDriveService");
const oAuth2Client = new google.auth.OAuth2();

describe("Google Drive Service", () => {
  describe("redirectToGoogle", () => {
    it("should redirect user to Google OAuth URL", () => {
      const mockRes = {
        redirect: jest.fn(),
      };

      // Call the function
      redirectToGoogle(
        {
          /* mock request */
        },
        mockRes
      );

      // Check if the redirect was called with the correct URL
      expect(mockRes.redirect).toHaveBeenCalledWith("https://auth.url");
      expect(oAuth2Client.generateAuthUrl).toHaveBeenCalledWith({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/drive", "profile"],
      });
    });
  });
});
