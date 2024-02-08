import { PrivateAppService } from './private-app.service';

describe('PrivateAppService', () => {
  let service: PrivateAppService;

  beforeEach(() => {
    service = new PrivateAppService();
  });

  it('should add a user', () => {
    // Arrange
    const user = { name: 'John Doe', email: 'johndoe@example.com' };

    // Act
    service.addUser(user);

    // Assert
    expect(service.getUsers()).toContain(user);
  });

  it('should not add a user with duplicate email', () => {
    // Arrange
    const user1 = { name: 'John Doe', email: 'johndoe@example.com' };
    const user2 = { name: 'Jane Smith', email: 'johndoe@example.com' };

    // Act
    service.addUser(user1);
    service.addUser(user2);

    // Assert
    expect(service.getUsers()).toContain(user1);
    expect(service.getUsers()).not.toContain(user2);
  });
});
