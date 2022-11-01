declare module "eth-keyring-controller" {
  /**
   * Strip the hex prefix from an address, if present
   * @param address - The address that might be hex prefixed.
   * @returns The address without a hex prefix.
   */
  function stripHexPrefix(address: string): string;

  class KeyringController {
    constructor(opts: any);
    /**
     * Full Update
     *
     * Emits the `update` event and @returns a Promise that resolves to
     * the current state.
     *
     * Frequently used to end asynchronous chains in this class,
     * indicating consumers can often either listen for updates,
     * or accept a state-resolving promise to consume their results.
     * @returns The controller state.
     */
    fullUpdate(): any;
    /**
     * Create New Vault And Keychain
     *
     * Destroys any old encrypted storage,
     * creates a new encrypted store with the given password,
     * randomly creates a new HD wallet with 1 account,
     * faucets that account on the testnet.
     * @param password - The password to encrypt the vault with.
     * @returns A Promise that resolves to the state.
     */
    createNewVaultAndKeychain(password: string): Promise<object>;
    /**
     * CreateNewVaultAndRestore
     *
     * Destroys any old encrypted storage,
     * creates a new encrypted store with the given password,
     * creates a new HD wallet from the given seed with 1 account.
     * @param password - The password to encrypt the vault with
     * @param seedPhrase - The BIP39-compliant seed phrase,
     * either as a string or an array of UTF-8 bytes that represent the string.
     * @returns A Promise that resolves to the state.
     */
    createNewVaultAndRestore(
      password: string,
      seedPhrase: string | number[]
    ): Promise<object>;
    /**
     * Set Locked
     * This method deallocates all secrets, and effectively locks MetaMask.
     * @returns A Promise that resolves to the state.
     */
    setLocked(): Promise<object>;
    /**
     * Submit Password
     *
     * Attempts to decrypt the current vault and load its keyrings
     * into memory.
     *
     * Temporarily also migrates any old-style vaults first, as well.
     * (Pre MetaMask 3.0.0)
     * @param password - The keyring controller password.
     * @returns A Promise that resolves to the state.
     */
    submitPassword(password: string): Promise<object>;
    /**
     * Verify Password
     *
     * Attempts to decrypt the current vault with a given password
     * to verify its validity.
     */
    verifyPassword(password: string): void;
    /**
     * Add New Keyring
     *
     * Adds a new Keyring of the given `type` to the vault
     * and the current decrypted Keyrings array.
     *
     * All Keyring classes implement a unique `type` string,
     * and this is used to retrieve them from the keyringTypes array.
     * @param type - The type of keyring to add.
     * @param opts - The constructor options for the keyring.
     * @returns The new keyring.
     */
    addNewKeyring(type: string, opts: any): Promise<Keyring>;
    /**
     * Remove Empty Keyrings
     *
     * Loops through the keyrings and removes the ones with empty accounts
     * (usually after removing the last / only account) from a keyring
     */
    removeEmptyKeyrings(): void;
    /**
     * Checks for duplicate keypairs, using the the first account in the given
     * array. Rejects if a duplicate is found.
     *
     * Only supports 'Simple Key Pair'.
     * @param type - The key pair type to check for.
     * @param newAccountArray - Array of new accounts.
     * @returns The account, if no duplicate is found.
     */
    checkForDuplicate(
      type: string,
      newAccountArray: string[]
    ): Promise<string[]>;
    /**
     * Add New Account
     *
     * Calls the `addAccounts` method on the given keyring,
     * and then saves those changes.
     * @param selectedKeyring - The currently selected keyring.
     * @returns A Promise that resolves to the state.
     */
    addNewAccount(selectedKeyring: Keyring): Promise<object>;
    /**
     * Export Account
     *
     * Requests the private key from the keyring controlling
     * the specified address.
     *
     * Returns a Promise that may resolve with the private key string.
     * @param address - The address of the account to export.
     * @returns The private key of the account.
     */
    exportAccount(address: string): Promise<string>;
    /**
     * Remove Account
     *
     * Removes a specific account from a keyring
     * If the account is the last/only one then it also removes the keyring.
     * @param address - The address of the account to remove.
     * @returns A Promise that resolves if the operation was successful.
     */
    removeAccount(address: string): Promise<void>;
    /**
     * Sign Ethereum Transaction
     *
     * Signs an Ethereum transaction object.
     * @param ethTx - The transaction to sign.
     * @param _fromAddress - The transaction 'from' address.
     * @param opts - Signing options.
     * @returns The signed transaction object.
     */
    signTransaction(
      ethTx: any,
      _fromAddress: string,
      opts: any
    ): Promise<object>;
    /**
     * Sign Message
     *
     * Attempts to sign the provided message parameters.
     * @param msgParams - The message parameters to sign.
     * @returns The raw signature.
     */
    signMessage(msgParams: any): Promise<Buffer>;
    /**
     * Sign Personal Message
     *
     * Attempts to sign the provided message parameters.
     * Prefixes the hash before signing per the personal sign expectation.
     * @param msgParams - The message parameters to sign.
     * @returns The raw signature.
     */
    signPersonalMessage(msgParams: any): Promise<Buffer>;
    /**
     * Get encryption public key
     *
     * Get encryption public key for using in encrypt/decrypt process.
     * @param address - The address to get the encryption public key for.
     * @returns The public key.
     */
    getEncryptionPublicKey(address: any): Promise<Buffer>;
    /**
     * Decrypt Message
     *
     * Attempts to decrypt the provided message parameters.
     * @param msgParams - The decryption message parameters.
     * @returns The raw decryption result.
     */
    decryptMessage(msgParams: any): Promise<Buffer>;
    /**
     * Sign Typed Data
     * (EIP712 https://github.com/ethereum/EIPs/pull/712#issuecomment-329988454)
     * @param msgParams - The message parameters to sign.
     * @returns The raw signature.
     */
    signTypedMessage(msgParams: any): Promise<Buffer>;
    /**
     * Gets the app key address for the given Ethereum address and origin.
     * @param _address - The Ethereum address for the app key.
     * @param origin - The origin for the app key.
     * @returns The app key address.
     */
    getAppKeyAddress(_address: string, origin: string): string;
    /**
     * Exports an app key private key for the given Ethereum address and origin.
     * @param _address - The Ethereum address for the app key.
     * @param origin - The origin for the app key.
     * @returns The app key private key.
     */
    exportAppKeyForAddress(_address: string, origin: string): string;
    /**
     * Create First Key Tree
     *
     * - Clears the existing vault
     * - Creates a new vault
     * - Creates a random new HD Keyring with 1 account
     * - Makes that account the selected account
     * - Faucets that account on testnet
     * - Puts the current seed words into the state tree
     * @param password - The keyring controller password.
     * @returns - A promise that resolves if the operation was successful.
     */
    createFirstKeyTree(password: string): Promise<void>;
    /**
     * Persist All Keyrings
     *
     * Iterates the current `keyrings` array,
     * serializes each one into a serialized array,
     * encrypts that array with the provided `password`,
     * and persists that encrypted string to storage.
     * @param password - The keyring controller password.
     * @returns Resolves to true once keyrings are persisted.
     */
    persistAllKeyrings(password: string): Promise<boolean>;
    /**
     * Unlock Keyrings
     *
     * Attempts to unlock the persisted encrypted storage,
     * initializing the persisted keyrings to RAM.
     * @param password - The keyring controller password.
     * @returns The keyrings.
     */
    unlockKeyrings(password: string): Promise<Keyring[]>;
    /**
     * Restore Keyring
     *
     * Attempts to initialize a new keyring from the provided serialized payload.
     * On success, updates the memStore keyrings and returns the resulting
     * keyring instance.
     * @param serialized - The serialized keyring.
     * @returns The deserialized keyring.
     */
    restoreKeyring(serialized: any): Promise<Keyring>;
    /**
     * Restore Keyring Helper
     *
     * Attempts to initialize a new keyring from the provided serialized payload.
     * On success, returns the resulting keyring instance.
     * @param serialized - The serialized keyring.
     * @returns The deserialized keyring.
     */
    _restoreKeyring(serialized: any): Promise<Keyring>;
    /**
     * Get Keyring Class For Type
     *
     * Searches the current `keyringTypes` array
     * for a Keyring class whose unique `type` property
     * matches the provided `type`,
     * returning it if it exists.
     * @param type - The type whose class to get.
     * @returns The class, if it exists.
     */
    getKeyringClassForType(type: string): Keyring | undefined;
    /**
     * Get Keyrings by Type
     *
     * Gets all keyrings of the given type.
     * @param type - The keyring types to retrieve.
     * @returns The keyrings.
     */
    getKeyringsByType(type: string): Keyring[];
    /**
     * Get Accounts
     *
     * Returns the public addresses of all current accounts
     * managed by all currently unlocked keyrings.
     * @returns The array of accounts.
     */
    getAccounts(): Promise<string[]>;
    /**
     * Get Keyring For Account
     *
     * Returns the currently initialized keyring that manages
     * the specified `address` if one exists.
     * @param address - An account address.
     * @returns The keyring of the account, if it exists.
     */
    getKeyringForAccount(address: string): Promise<Keyring>;
    /**
     * Display For Keyring
     *
     * Is used for adding the current keyrings to the state object.
     * @returns A keyring display object, with type and accounts properties.
     */
    displayForKeyring(keyring: Keyring): Promise<object>;
    /**
     * Update memStore Keyrings
     *
     * Updates the in-memory keyrings, without persisting.
     */
    _updateMemStoreKeyrings(): void;
    /**
     * Unlock Keyrings
     *
     * Unlocks the keyrings.
     */
    setUnlocked(): void;
    /**
     * Forget hardware keyring
     *
     * Forget hardware and update memorized state.
     */
    forgetKeyring(keyring: Keyring): void;
  }

  export = KeyringController;
}
