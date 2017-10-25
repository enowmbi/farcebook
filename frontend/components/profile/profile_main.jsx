import React from 'react';
import ProfileHeader from './profile_header';
import ProfileAboutList from './profile-about-side';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';

class ProfileMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (!this.props.user.id) {
      this.props.fetchUser(this.props.match.params.userId)
      this.props.fetchUsers();
    } else {
      this.props.fetchUser(this.props.match.params.userId)
    }
  }


  render(){
    return (
      <div>
        <ProfileHeader user={this.props.user}
                      fetchUser={this.props.fetchUser}/>

        <main className='profile-body flex-row'>
          <ProfileAboutList user={this.props.user}/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId] || {}
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
