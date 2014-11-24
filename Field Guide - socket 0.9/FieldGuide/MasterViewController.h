//
//  MasterViewController.h
//  FieldGuide
//
//  Created by David Stubbs on 2014-10-22.
//  Copyright (c) 2014 DS. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DetailViewController;

@interface MasterViewController : UITableViewController

@property (strong, nonatomic) DetailViewController *detailViewController;
@property (nonatomic, strong) IBOutlet UITableView *tableView;
@property (strong) IBOutlet UIImageView *emptyView;


@end

