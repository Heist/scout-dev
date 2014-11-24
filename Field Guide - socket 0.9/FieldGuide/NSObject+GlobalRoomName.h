//
//  NSObject+GlobalRoomName.h
//  FieldGuide
//
//  Created by Alex Leitch on 2014-11-21.
//  Copyright (c) 2014 DS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSObject (GlobalRoomName)
    
@end

@interface DataClass : NSObject {
    
    NSString *hash = [self md5: [[[UIDevice currentDevice] identifierForVendor] UUIDString]];
    hash = [hash substringWithRange:NSMakeRange(0, 8)];
}

@property(nonatomic,retain)NSString *str;
+(DataClass*)getInstance;
@end