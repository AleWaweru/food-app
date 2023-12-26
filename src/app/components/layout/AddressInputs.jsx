export default function AddressInputs({addressProps, setAddressProps}) {
    const {phone, address, postal, city, country} = addressProps;
    return(
        <>
        <label>Phone</label>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setAddressProps(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postal}
              onChange={(e) => setAddressProps('postal' , e.target.value)}
              />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setAddressProps('city' , e.target.value)}
              />
          </div>
        </div>

        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddressProps('address' , e.target.value)}
        />

        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setAddressProps('country' , e.target.value)}
        />
        </>
    );
}