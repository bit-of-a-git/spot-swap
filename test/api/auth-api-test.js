import { assert } from "chai";
import { spotswapService } from "./spotswap-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    spotswapService.clearAuth();
    await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggieCredentials);
    await spotswapService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await spotswapService.createUser(maggie);
    const response = await spotswapService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await spotswapService.createUser(maggie);
    const response = await spotswapService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.id, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    spotswapService.clearAuth();
    try {
      await spotswapService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
