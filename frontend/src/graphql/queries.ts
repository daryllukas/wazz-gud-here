import { gql } from "@apollo/client";
export const getVendor = gql`
      query GetVendor($slug: String) {
        vendors(filters: {slug: {eq: $slug}}) {
            data {
            id
            attributes {
              name
              avatar {
                  data {
                      id
                      attributes {
                          url
                      }
                  }
              }
              slug
              city {
                  data {
                      id
                      attributes {
                          name
                      }
                  }
              }
              information {
                  description
                  contact {
                      email
                      website
                      phone
                      address
                  }
                  openingHours {
                      day
                      open
                      close
                  }
              }
              specials_menu {
                  data {
                      id
                      attributes {
                          name
                          menu_items {
                              data {
                                  id
                                  attributes {
                                      name
                                      price
                                      featuredImage {
                                          data {
                                              attributes {
                                                  url
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
              menu_groups {
                data {
                  id
                  attributes {
                      name
                      featuredImage {
                      data {
                        attributes {
                        url
                       }
                        }
                      }
                  }
                }
              }
            }
          }
       }
}`;

export const getMenuItemsByGroup = gql`
query GetMenuItemsByGroup($menuGroupId: ID) {
  menuGroup(id: $menuGroupId) {
    data {
      id
      attributes {
        name
        featuredImage {
          data {
            attributes {
              url
            }
          }
        }
        vendor {
          data {
            attributes {
              name
            }
          }
        }
        menu_items {
          data {
            id
            attributes {
              name
              price
              featuredImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              description
            }
          }
        }
      }
    }
  }
}`;

export const getVendors = gql`
query GetVendors {
  vendors {
    data {
      id
      attributes {
        name
        avatar {
          data {
            id
            attributes {
              url
            }
          }
        }
        slug
        city {
          data {
            id
            attributes {
              name
            }
          }
        }
        information {
          description
          openingHours {
            day
            open
            close
          }
        }
        menu_groups {
          data {
            id
            attributes {
              name
              featuredImage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;