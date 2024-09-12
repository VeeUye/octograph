module.exports = {
 preset: 'ts-jest',
 testEnvironment: 'jest-environment-jsdom',
 clearMocks: true,
 moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
 testMatch: ['**/*.test.(ts|tsx|js|jsx)'],
 setupFilesAfterEnv: ['./jest.setup.ts'],
}
