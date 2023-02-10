import EditUserForm from "../../components/EditUserForm";

const EditProfilePage = ({ setShowModal }) => {
  return (
    <section>
      <EditUserForm setShowModal={setShowModal} />
    </section>
  );
};

export default EditProfilePage;
