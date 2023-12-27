export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, address, postal, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setAddressProps(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-10">
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={postal}
            onChange={(e) => setAddressProps("postal", e.target.value)}
          />
        </div>

        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
          />
        </div>
      </div>

      <label>Street Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street Address"
        value={address}
        onChange={(e) => setAddressProps("address", e.target.value)}
      />

      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setAddressProps("country", e.target.value)}
      />
    </>
  );
}
