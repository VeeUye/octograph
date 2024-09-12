module.exports = {
 preset: 'ts-jest', // Ensure ts-jest is set as the preset
 testEnvironment: 'jest-environment-jsdom', // Explicitly set the jsdom environment
 clearMocks: true,
 moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
 testMatch: ['**/*.test.(ts|tsx|js|jsx)'],
 setupFilesAfterEnv: ['./jest.setup.ts'], // Ensure this points to your setup file
}
