import type React from "react";
interface User {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

interface AccountDetailsProps {
  user: User | null;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
  return (
    <div>
      <h2>Account Details</h2>
      {user ? (
        <div>
          <p>First Name: {user.first_name || "N/A"}</p>
          <p>Last Name: {user.last_name || "N/A"}</p>
          <p>Email: {user.email || "N/A"}</p>
          <p>Phone: {user.phone || "N/A"}</p>
          <p>Address: {user.address || "N/A"}</p>
          <p>City: {user.city || "N/A"}</p>
          <p>Postal Code: {user.postal_code || "N/A"}</p>
          <p>Country: {user.country || "N/A"}</p>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default AccountDetails;
